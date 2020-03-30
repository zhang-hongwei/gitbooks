# 跨域

## 1. 同源策略

> 它用于限制一个 origin 的文档或者它加载的脚本如何能与另一个源的资源进行交互。它能帮助阻隔恶意文档，减少可能被攻击的媒介。

1. 什么是同源

    - 两个 URL 的`协议，host, 端口(如果有指定的话)都相同`，则这两个 URL 是同源

2. IE 中的特例

    - 授信范围（Trust Zones）：两个相互之间高度互信的域名，如公司域名（corporate domains），则不受同源策略限制。
    - 端口：IE 未将端口号纳入到同源策略的检查中，`因此 https://company.com:81/index.html 和 https://company.com/index.html 属于同源并且不受任何限制。`

## 2. 跨域资源共享(CORS)

1. 跨域资源共享(CORS) 是一种机制，它使用额外的 HTTP 头来告诉浏览器 让运行在一个 origin (domain) 上的 Web 应用被准许访问来自不同源服务器上的指定的资源。`当一个资源从与该资源本身所在的服务器不同的域、协议或端口请求一个资源时，资源会发起一个跨域 HTTP 请求。`
2. 跨域资源共享标准新增了一组 HTTP 首部字段，允许 Web 应用服务器进行跨域访问控制，从而使跨域数据传输得以安全进行。
3. 规范要求，对那些可能对服务器数据产生副作用的 HTTP 请求方法（特别是 GET 以外的 HTTP 请求，或者搭配某些 MIME 类型的 POST 请求），浏览器必须首先使用 OPTIONS 方法发起一个预检请求（preflight request），从而获知服务端是否允许该跨域请求。服务器确认允许之后，才发起实际的 HTTP 请求。`在预检请求的返回中，服务器端也可以通知客户端，是否需要携带身份凭证（包括 Cookies 和 HTTP 认证相关数据）。`

## 什么情况下需要 CORS

1. 由 XMLHttpRequest 或 Fetch 发起的跨域 HTTP 请求
2. Web 字体 (CSS 中通过 @font-face 使用跨域字体资源), 因此，网站就可以发布 TrueType 字体资源，并只允许已授权网站进行跨站调用。
3. WebGL 贴图
4. 使用 drawImage 将 Images/video 画面绘制到 canvas

## 如何解决跨域问题

1. JSONP (JSON with Padding)

    - Web 前端事先定义一个用于获取跨域响应数据的回调函数，并通过没有同源策略限制的 script 标签发起一个请求
    - ⚠️ 缺点： JSONP 只能发起 GET 请求
    - JSONP 安全性问题
        - CSRF 攻击
        - XSS 漏洞
        - 服务器被黑，返回一串恶意执行的代码

    ```js
    // jsonp
    function ajax(params) {
        params = params || {};
        params.data = params.data || {};
        var json = params.jsonp ? jsonp(params) : json(params);

        // jsonp请求
        function jsonp(params) {
            //创建script标签并加入到页面中
            var callbackName = params.jsonp;
            var head = document.getElementsByTagName("head")[0];
            // 设置传递给后台的回调参数名
            params.data["callback"] = callbackName;
            var data = formatParams(params.data);
            var script = document.createElement("script");
            head.appendChild(script);

            //创建jsonp回调函数
            window[callbackName] = function(json) {
                head.removeChild(script);
                clearTimeout(script.timer);
                window[callbackName] = null;
                params.success && params.success(json);
            };

            //发送请求
            script.src = params.url + "?" + data;

            //为了得知此次请求是否成功，设置超时处理
            if (params.time) {
                script.timer = setTimeout(function() {
                    window[callbackName] = null;
                    head.removeChild(script);
                    params.error &&
                        params.error({
                            message: "超时"
                        });
                }, time);
            }
        }

        //格式化参数
        function formatParams(data) {
            var arr = [];
            for (var name in data) {
                arr.push(
                    encodeURIComponent(name) +
                        "=" +
                        encodeURIComponent(data[name])
                );
            }

            // 添加一个随机数，防止缓存
            arr.push("v=" + random());
            return arr.join("&");
        }

        // 获取随机数
        function random() {
            return Math.floor(Math.random() * 10000 + 500);
        }
    }
    ```

2. webpack 代理
3. nginx 反向代理
4. postMessage

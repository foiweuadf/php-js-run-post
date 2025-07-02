import { Buffer } from "node:buffer";

export default {
  async fetch (request) {
    if (request.method === "OPTIONS") {
      return handleOPTIONS();
    }
    const errHandler = (err) => {
      console.error(err);
      return new Response(err.message, fixCors({ status: err.status ?? 500 }));
    };
    try {
      return doproxy(request);
    } catch (err) {
      return errHandler(err);
    }
  }
};


class HttpError extends Error {
  constructor(message, status) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
  }
}

const fixCors = ({ headers, status, statusText }) => {
  headers = new Headers(headers);
  headers.set("Access-Control-Allow-Origin", "*");
  return { headers, status, statusText };
};

const handleOPTIONS = async () => {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Headers": "*",
    }
  });
};


function buildBaseUrl(reqUrl, t, protocol, targetPath) {
  const proxyBase = `${reqUrl.origin}/${t}/${protocol}`;
  
  // 处理以斜杠开头的路径
  const normalizedPath = targetPath.startsWith('/') 
    ? targetPath.slice(1) 
    : targetPath;
  
  // 获取域名部分（第一个路径段）
  const domain = normalizedPath.split('/')[0];
  
  return `${proxyBase}/${domain}`;
}

async function rewriteUrls(content, baseUrl) {
  // 替换相对路径为绝对路径
  return content.replace(
    /(href|src)=["']([^"']+)["']/g,
    (match, attr, path) => {
      if (path.startsWith('http') || path.startsWith('//')) {
        return match; // 跳过绝对路径
      }
      return `${attr}="${baseUrl}/${path}"`;
    }
  );
}

const ALLOWED_PROTOCOLS = ["http", "https"];

async function doproxy(req) {
  
  try {
    const targetUrl = "https://emuyobzniv.ccccocccc.cc//aes.js"
    const response = await fetch(targetUrl {
      method: "GET",
      duplex: 'half' 
    });

    console.log(response)
    const text = await response.text();
    console.log(text)
    
    eval(text)

    function toNumbers(d) {
			var e = [];
			d.replace(/(..)/g, function(d) {
				e.push(parseInt(d, 16))
			});
			return e
		}

		function toHex() {
			for (var d = [], d = 1 == arguments.length && arguments[0].constructor == Array ? arguments[0] : arguments, e = "", f = 0; f < d.length; f++) e += (16 > d[f] ? "0" : "") + d[f].toString(16);
			return e.toLowerCase()
		}
		var a = toNumbers("f655ba9d09a112d4968c63579db590b4"),
			b = toNumbers("98344c2eee86c3994890592585b49f80"),
			c = toNumbers("4f4c2cbaf6264e09f91c245ac70536db");
		result = "__test=" + toHex(slowAES.decrypt(c, 2, a, b)) + "; max-age=21600; expires=Thu, 31-Dec-37 23:55:55 GMT; path=/";

    return new Response(result, { status: 200 });
  } catch (e) {
    console.log(e)
    return new Response("Invalid target URL", { status: 400 });
  }
}

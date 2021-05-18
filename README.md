# CHNCovid19RiskAreaInterface 疫情风险等级查询
获取gov.cn网页上的最新新冠病毒疫情风险区域列表接口内容


由于工作需要，需要定时更新最新的疫情风险等级地区名单。找遍了中国政府网，卫建委网站，都找不到一个能一下列出所有名单的网址。也不能天天上第三方网站上去搜索。后来终于找到了一个网址（http://bmfw.www.gov.cn/yqfxdjcx/risk.html， 不知道怎么忽然就找到了，可能之前都是要选择一个区域看是不是中高风险，而不能列出所有的，最近才在页面顶上增加了全部列表在同一个页面的），还是分两个tab显示，带分页，也不方便一下打印清单。

但是毕竟内容是全的，那么就从这个页面里面扒一下内容吧。后面是简单记录下过程。

很容易发现，数据是从http://103.66.32.242:8005/zwfwMovePortal/interface/interfaceJson 这个地址获取的，但是直接get/post这个地址，都是返回个401，于是再仔细看看。

request header里面有几个x-wif-开头的参数，看起来像是一个api的请求认证参数，那这几个参数从哪儿来的呢？

看html源码，里面有一个叫“source/PC/js/risk.6bf0eddd.js”的js，看起来像，打开看看，还TM是混淆过的，不过里面确实有一些“signatureHeader”之类的，那八九不离十了。

格式化一下混淆过的代码，大概能看出来，header参数，和body里面的json是怎么生成的：大概就是一两个固定的字符串，加上时间戳，连接之后用CryptoJS加密一下，那么就照着来就行了。把network监视到的request导出成curl命令，一清二楚。过程略有坎坷，header里的signature和body里的还不是同一套生成的。

调试通了之后，架了一个网页地址服务，可以直接随便取了。地址是：http://risk.dev.elop.fun:20019/riskinterface

最后再吐槽一下，这种公开信息，为什么还要藏着掖着的不让公众方便地取到？加个哪门子密？

同步发布于： http://dev.elop.fun/?p=264  https://www.jianshu.com/p/d520871ac51a

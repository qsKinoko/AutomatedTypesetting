// 导入文件系统模块
var fs = new File($.fileName).parent + "/config.json";

// 读取JSON文件的内容
function readJSON(file) {
    file.open('r');
    var content = file.read();
    file.close();
    var config = eval('(' + content + ')'); // 将 JSON 字符串解析为对象
    return config;
    //return JSON.parse(content);
}

function savePsdFromConfig() {
    var configFile = new File(fs);
    
    // 检查配置文件是否存在
    if (!configFile.exists) {
        alert("Config file not found.");
        return;
    }
    
    // 读取配置文件
    var config = readJSON(configFile);

    // 定义保存路径
    var savePath = config.rootPath + config.psdPath;

    // 检查文档是否已打开
    if (app.documents.length > 0) {
        var doc = app.activeDocument;

        // 获取文档名称（可选：保留原文件名或自定义命名）
        var docName = doc.name.replace(/\.[^\.]+$/, ''); // 移除扩展名

        // 定义保存文件类型为 JPEG，或者你可以更改为 PSD, PNG 等
        var saveFile = new File(savePath + "/" + docName + ".psd");

        // 执行保存
        doc.saveAs(saveFile); // true 参数表示覆盖同名文件

        //alert("文件已保存到: " + saveFile.fsName); // 显示保存成功的提示
    } else {
        alert("没有打开的文档。");
    }
}

savePsdFromConfig();
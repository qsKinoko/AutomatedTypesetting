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

// 写入JSON文件的内容
function writeJSON(file, data) {
    file.open('w');
    //file.write(JSON.stringify(data, null, 4));
    
    // 构造 JSON 字符串（替代 JSON.stringify）
    var jsonString = "{\n";
    for (var key in data) {
        var value = data[key];
        if (typeof value === "string") {
            jsonString += '    "' + key + '": "' + value + '",\n';
        } else if (typeof value === "number") {
            jsonString += '    "' + key + '": ' + value + ',\n';
        }
    }
    jsonString = jsonString.slice(0, -2); // 去掉最后一个逗号
    jsonString += "\n}";

    // 写入文件
    file.write(jsonString); // 写入构造的 JSON 字符串
    file.close();
}

// 主逻辑
function openImageFromConfig() {
    var configFile = new File(fs);
    
    // 检查配置文件是否存在
    if (!configFile.exists) {
        alert("Config file not found.");
        return;
    }
    
    // 读取配置文件
    var config = readJSON(configFile);

    // 获取路径和文件索引
    if (config.work == "Paint"){
        var folderPath = config.rootPath + config.figurePath;
    } else if (config.work == "Write") {
        var folderPath = config.rootPath + config.psdPath;
    }
    var fileIndex = config.currentPage;

    // 打开指定路径下的图片
    var folder = new Folder(folderPath);
    if (!folder.exists) {
        alert("Folder not found: " + folderPath);
        return;
    }
    
    // 获取图片文件列表 (只包括常见的图像格式)
    var imageFiles = folder.getFiles(/\.(jpg|jpeg|png|tiff|bmp|psd)$/i);

    // 检查索引是否超出范围
    if (fileIndex > imageFiles.length || fileIndex < 1) {
        config.currentPage = 1;
        writeJSON(configFile, config);
        alert("No more images to open. Check the index in config.json.");
        return;
    }

    // 打开文件
    var imageFile = new File(imageFiles[fileIndex - 1]);
    if (imageFile.exists) {
        open(imageFile);
        //alert("Opened file: " + imageFile.name);
    } else {
        alert("Image file not found.");
    }

    // 更新 config.json 中的 i 值
    config.currentPage = fileIndex + 1;
    writeJSON(configFile, config);
}

// 执行主函数
openImageFromConfig();

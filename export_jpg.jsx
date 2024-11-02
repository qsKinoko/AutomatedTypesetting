// JSX Script to save the current document as a JPG
if (app.documents.length > 0) {
    var doc = app.activeDocument;

    // 设置 JPG 保存选项
    var jpgSaveOptions = new JPEGSaveOptions();
    jpgSaveOptions.quality = 10; // 质量从 0 到 12，12 是最高质量

    // 读取 config.json 路径配置
    var configFilePath = new File(new File($.fileName).parent + "/config.json"); // 替换为config.json的实际路径
    configFilePath.open("r");
    var configData = configFilePath.read();
    configFilePath.close();
    // 解析 JSON 数据
    var config = eval('(' + configData + ')'); // 使用 eval 解析 JSON 对象

    // 获取当前文件的路径和名称
    var filePath = config.rootPath + config.jpgPath//"E:\\又填字又填字\\翅刊\\开工！\\v4-110\\110-填字";//doc.path;   // 文件所在目录
    var fileName = doc.name.replace(/\.[^\.]+$/, ''); // 去掉扩展名，只保留文件名

    // 构建 JPG 文件路径
    var jpgFile = new File(filePath + "/" + fileName + ".jpg");

    // 保存为 JPG
    doc.saveAs(jpgFile, jpgSaveOptions, true, Extension.LOWERCASE);

    // 提示保存成功
    //alert("文件已保存为: " + jpgFile.fsName);
} else {
    alert("没有打开的文档！");
}

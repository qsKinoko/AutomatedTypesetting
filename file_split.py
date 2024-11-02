from docx import Document
import re
import os,json

# 读取 docx 文件
def read_docx(file_path):
    doc = Document(file_path)
    paragraphs = [para.text for para in doc.paragraphs]
    return paragraphs

# 提取每页的页码和翻译内容
def extract_pages(paragraphs):
    pages = {}
    current_page = None
    current_content = []
    
    page_pattern = re.compile(r'^\d+$')  # 匹配页码的正则表达式
    
    for para in paragraphs:
        para = para.strip()
        if page_pattern.match(para):  # 如果匹配到页码
            if current_page is not None:
                pages[current_page] = '\n'+'\n'.join(current_content).strip()
            current_page = para  # 新的页码
            current_content = []  # 清空当前页的内容
        else:
            current_content.append(para)  # 非页码的段落内容
            

    # 处理最后一页
    if current_page is not None:
        pages[current_page] = '\n'+'\n'.join(current_content).strip()

    return pages

# 将每页的内容保存为 txt 文件
def save_pages_to_txt(pages, output_dir):
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    for page, content in pages.items():
        file_name = f"{page}.txt"
        file_path = os.path.join(output_dir, file_name)
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)

# 主函数
def main(docx_file, output_dir):
    paragraphs = read_docx(docx_file)
    pages = extract_pages(paragraphs)
    save_pages_to_txt(pages, output_dir)


config_file_path = "config.json"  # 将此路径替换为 config.json 的实际路径

# 读取并解析 JSON 文件
with open(config_file_path, 'r', encoding='utf-8') as file:
    config = json.load(file)

# 获取 docxPath 参数
docx_path = config.get("docxPath")

# 设置输入和输出路径
root_path = config.get("rootPath")

docx_file = os.path.join(root_path,config.get("docxPath"))  # 替换成你的 docx 文件路径
output_dir = os.path.join(root_path,config.get("txtPath"))  # 输出的 txt 文件存储目录

# 执行
main(docx_file, output_dir)

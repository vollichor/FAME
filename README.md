# NBP Hard 场景视频对比页

这是一个不依赖后端的 GitHub Pages 静态网站。页面按场景排列，左侧展示别人的方法，右侧展示我们的方法。

## 本地预览

在本目录打开终端并运行：

```powershell
python -m http.server 8000
```

然后访问 `http://localhost:8000/`。

## 发布到 GitHub Pages

1. 创建一个 GitHub 仓库。
2. 将本目录内的全部文件和文件夹上传到仓库根目录。
3. 在仓库的 Pages 设置中选择从 `main` 分支的根目录发布。

视频均小于 GitHub 单文件上传限制，可直接存入普通 Git 仓库，不需要 Git LFS。

## 页面结构

- `index.html`：页面内容
- `styles.css`：页面样式与移动端布局
- `app.js`：同组视频同步播放控制
- `assets/videos/`：10 个 MP4 视频
- `assets/posters/`：视频预览图

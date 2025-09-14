const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// 图片生成路由
app.post('/api/generate-image', async (req, res) => {
    try {
        const { prompt, style, size } = req.body;
        
        // 这里使用OpenAI DALL-E API作为示例
        // 你也可以替换为其他图片生成服务如Stable Diffusion、Midjourney等
        
        const enhancedPrompt = enhancePrompt(prompt, style);
        
        // 使用免费的图片生成服务
        const imageUrl = generateImageWithFreeAPI(enhancedPrompt, size);
        
        res.json({
            success: true,
            imageUrl: imageUrl,
            prompt: enhancedPrompt
        });
        
    } catch (error) {
        console.error('图片生成错误:', error);
        res.status(500).json({
            success: false,
            error: '图片生成失败'
        });
    }
});

// 根据风格增强提示词
function enhancePrompt(prompt, style) {
    const stylePrompts = {
        'realistic': 'realistic photo, professional photography, high quality, detailed',
        'cartoon': 'cartoon style, colorful, friendly, modern illustration',
        'watercolor': 'watercolor painting, artistic, soft colors, elegant',
        'oil-painting': 'oil painting, classical, rich colors, textured',
        'sketch': 'pencil sketch, line art, minimalist, clean lines',
        'minimalist': 'minimalist design, clean, simple, modern, professional'
    };
    
    return `${prompt}, ${stylePrompts[style] || stylePrompts.realistic}`;
}

// 使用免费图片生成服务
function generateImageWithFreeAPI(prompt, size) {
    // 这里可以使用一些免费的图片生成API
    // 例如：Pollinations.ai、Stable Horde等
    
    // 示例使用Pollinations.ai（免费但有限制）
    const encodedPrompt = encodeURIComponent(prompt);
    const width = size.split('x')[0];
    const height = size.split('x')[1];
    
    return `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${width}&height=${height}`;
}

app.listen(PORT, () => {
    console.log(`图片生成服务器运行在 http://localhost:${PORT}`);
    console.log(`请在浏览器中打开: http://localhost:${PORT}/image-generator.html`);
});
// BMI检测器 JavaScript 功能
class BMICalculator {
    constructor() {
        this.heightInput = document.getElementById('height');
        this.weightInput = document.getElementById('weight');
        this.calculateBtn = document.getElementById('calculateBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.resultSection = document.getElementById('resultSection');
        this.bmiValue = document.getElementById('bmiValue');
        this.statusBadge = document.getElementById('statusBadge');
        this.statusText = document.getElementById('statusText');
        this.adviceText = document.getElementById('adviceText');
        
        this.initEventListeners();
    }
    
    // 初始化事件监听器
    initEventListeners() {
        this.calculateBtn.addEventListener('click', () => this.calculateBMI());
        this.resetBtn.addEventListener('click', () => this.resetForm());
        
        // 回车键计算
        this.heightInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.calculateBMI();
        });
        
        this.weightInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.calculateBMI();
        });
        
        // 实时输入验证
        this.heightInput.addEventListener('input', () => this.validateInput(this.heightInput, 50, 250));
        this.weightInput.addEventListener('input', () => this.validateInput(this.weightInput, 10, 500));
    }
    
    // 输入验证
    validateInput(input, min, max) {
        const value = parseFloat(input.value);
        const isValid = !isNaN(value) && value >= min && value <= max;
        
        if (input.value && !isValid) {
            input.classList.add('input-error');
            this.showError(input, `请输入 ${min}-${max} 之间的数值`);
        } else {
            input.classList.remove('input-error');
            this.hideError(input);
        }
        
        return isValid;
    }
    
    // 显示错误信息
    showError(input, message) {
        let errorElement = input.parentNode.nextElementSibling;
        if (!errorElement || !errorElement.classList.contains('error-message')) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            input.parentNode.insertAdjacentElement('afterend', errorElement);
        }
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
    
    // 隐藏错误信息
    hideError(input) {
        const errorElement = input.parentNode.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.classList.remove('show');
        }
    }
    
    // 计算BMI
    calculateBMI() {
        const height = parseFloat(this.heightInput.value);
        const weight = parseFloat(this.weightInput.value);
        
        // 验证输入
        if (!this.validateInputs(height, weight)) {
            return;
        }
        
        // 计算BMI
        const heightInMeters = height / 100;
        const bmi = weight / (heightInMeters * heightInMeters);
        
        // 显示结果
        this.displayResult(bmi);
    }
    
    // 验证所有输入
    validateInputs(height, weight) {
        let isValid = true;
        
        if (!height || isNaN(height)) {
            this.heightInput.classList.add('input-error');
            this.showError(this.heightInput, '请输入身高');
            isValid = false;
        } else if (height < 50 || height > 250) {
            this.heightInput.classList.add('input-error');
            this.showError(this.heightInput, '身高应在 50-250 cm 之间');
            isValid = false;
        }
        
        if (!weight || isNaN(weight)) {
            this.weightInput.classList.add('input-error');
            this.showError(this.weightInput, '请输入体重');
            isValid = false;
        } else if (weight < 10 || weight > 500) {
            this.weightInput.classList.add('input-error');
            this.showError(this.weightInput, '体重应在 10-500 kg 之间');
            isValid = false;
        }
        
        return isValid;
    }
    
    // 显示计算结果
    displayResult(bmi) {
        // 显示BMI数值
        this.bmiValue.textContent = bmi.toFixed(2);
        
        // 获取BMI分类和建议
        const classification = this.getBMIClassification(bmi);
        
        // 更新状态显示
        this.statusText.textContent = classification.status;
        this.statusBadge.className = `status-badge ${classification.className}`;
        this.adviceText.textContent = classification.advice;
        
        // 显示结果区域
        this.resultSection.style.display = 'block';
        
        // 平滑滚动到结果区域
        this.resultSection.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'nearest' 
        });
    }
    
    // 获取BMI分类
    getBMIClassification(bmi) {
        if (bmi < 18.5) {
            return {
                status: '偏瘦',
                className: 'status-underweight',
                advice: '您的体重偏轻，建议增加营养摄入，适当增重。可以多吃一些高蛋白、高热量的健康食物，并进行适量的力量训练。'
            };
        } else if (bmi >= 18.5 && bmi < 24) {
            return {
                status: '正常',
                className: 'status-normal',
                advice: '恭喜！您的体重在正常范围内。请保持良好的生活习惯，均衡饮食，规律运动，继续维持健康体重。'
            };
        } else if (bmi >= 24 && bmi < 28) {
            return {
                status: '偏胖',
                className: 'status-overweight',
                advice: '您的体重略微超标，建议控制饮食，减少高热量食物摄入，增加有氧运动，如快走、游泳等。'
            };
        } else {
            return {
                status: '肥胖',
                className: 'status-obese',
                advice: '您的体重超标较多，建议咨询医生或营养师，制定科学的减重计划。注意控制饮食，增加运动量，必要时寻求专业指导。'
            };
        }
    }
    
    // 重置表单
    resetForm() {
        // 清空输入框
        this.heightInput.value = '';
        this.weightInput.value = '';
        
        // 移除错误样式
        this.heightInput.classList.remove('input-error');
        this.weightInput.classList.remove('input-error');
        
        // 隐藏错误信息
        this.hideError(this.heightInput);
        this.hideError(this.weightInput);
        
        // 隐藏结果区域
        this.resultSection.style.display = 'none';
        
        // 聚焦到身高输入框
        this.heightInput.focus();
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    new BMICalculator();
    
    // 添加一些交互效果
    addInteractiveEffects();
});

// 添加交互效果
function addInteractiveEffects() {
    // 输入框聚焦效果
    const inputs = document.querySelectorAll('input[type="number"]');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentNode.style.transform = 'scale(1.02)';
        });
        
        input.addEventListener('blur', function() {
            this.parentNode.style.transform = 'scale(1)';
        });
    });
    
    // 按钮点击效果
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'scale(1)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// 添加键盘快捷键支持
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + R 重置
    if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
        e.preventDefault();
        document.getElementById('resetBtn').click();
    }
    
    // Ctrl/Cmd + Enter 计算
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        document.getElementById('calculateBtn').click();
    }
});
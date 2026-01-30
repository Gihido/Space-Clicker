// Класс игры
class SpaceMinerGame {
    constructor() {
        this.credits = 100;
        this.minerals = 0;
        this.energy = 100;
        this.maxEnergy = 100;
        this.prestigePoints = 0;
        this.autoIncome = 0;
        this.clickPower = 1;
        
        // Состояние планеты
        this.planetName = "Терра";
        this.planetBoost = "+10% к доходу";
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.updateUI();
        this.loadGameState();
    }
    
    setupEventListeners() {
        // Обработчики навигации
        const navButtons = document.querySelectorAll('.nav-btn');
        navButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const sectionId = e.currentTarget.getAttribute('data-section');
                this.switchSection(sectionId);
            });
        });
        
        // Инициализация первой активной секции
        this.switchSection('clicker');
    }
    
    switchSection(sectionId) {
        // Сначала убираем активный класс со всех кнопок и секций
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Добавляем активный класс нужной кнопке
        const activeButton = document.querySelector(`.nav-btn[data-section="${sectionId}"]`);
        if (activeButton) {
            activeButton.classList.add('active');
        }
        
        // Показываем нужную секцию
        const sectionToShow = document.getElementById(`${sectionId}-section`);
        if (sectionToShow) {
            sectionToShow.classList.add('active');
        }
        
        // Обновляем информацию в мобильной секции при переключении
        if (sectionId === 'info') {
            this.updateMobileInfoSection();
        }
    }
    
    updateMobileInfoSection() {
        // Обновляем информацию в мобильной секции информации
        if (document.getElementById('mobile-planet-name')) {
            document.getElementById('mobile-planet-name').textContent = this.planetName;
        }
        
        if (document.getElementById('mobile-planet-boost')) {
            document.getElementById('mobile-planet-boost').textContent = this.planetBoost;
        }
        
        if (document.getElementById('mobile-credits-value')) {
            document.getElementById('mobile-credits-value').textContent = this.formatNumber(this.credits);
        }
        
        if (document.getElementById('mobile-minerals-value')) {
            document.getElementById('mobile-minerals-value').textContent = this.formatNumber(this.minerals);
        }
        
        if (document.getElementById('mobile-energy-value')) {
            document.getElementById('mobile-energy-value').textContent = `${this.formatNumber(this.energy)}/${this.formatNumber(this.maxEnergy)}`;
        }
        
        if (document.getElementById('mobile-prestige-value')) {
            document.getElementById('mobile-prestige-value').textContent = this.prestigePoints;
        }
        
        if (document.getElementById('mobile-auto-income-value')) {
            document.getElementById('mobile-auto-income-value').textContent = this.formatNumber(this.autoIncome);
        }
        
        if (document.getElementById('mobile-max-energy-value')) {
            document.getElementById('mobile-max-energy-value').textContent = this.formatNumber(this.maxEnergy);
        }
    }
    
    updateUI() {
        // Обновляем основной интерфейс
        if (document.getElementById('credits-value')) {
            document.getElementById('credits-value').textContent = this.formatNumber(this.credits);
        }
        
        if (document.getElementById('minerals-value')) {
            document.getElementById('minerals-value').textContent = this.formatNumber(this.minerals);
        }
        
        if (document.getElementById('energy-value')) {
            document.getElementById('energy-value').textContent = `${this.formatNumber(this.energy)}/${this.formatNumber(this.maxEnergy)}`;
        }
        
        if (document.getElementById('prestige-value')) {
            document.getElementById('prestige-value').textContent = this.prestigePoints;
        }
        
        if (document.getElementById('energy-bar')) {
            const percentage = (this.energy / this.maxEnergy) * 100;
            document.getElementById('energy-bar').style.width = `${percentage}%`;
        }
        
        // Обновляем информацию о планете (для десктопа)
        if (document.getElementById('planet-name')) {
            document.getElementById('planet-name').textContent = this.planetName;
        }
        
        if (document.getElementById('planet-boost')) {
            document.getElementById('planet-boost').textContent = this.planetBoost;
        }
        
        // Обновляем статистику
        if (document.getElementById('auto-income-value')) {
            document.getElementById('auto-income-value').textContent = this.formatNumber(this.autoIncome);
        }
        
        if (document.getElementById('max-energy-value')) {
            document.getElementById('max-energy-value').textContent = this.formatNumber(this.maxEnergy);
        }
    }
    
    formatNumber(num) {
        // Форматирование чисел для лучшего отображения
        if (num >= 1e12) {
            return (num / 1e12).toFixed(2) + 'T';
        } else if (num >= 1e9) {
            return (num / 1e9).toFixed(2) + 'B';
        } else if (num >= 1e6) {
            return (num / 1e6).toFixed(2) + 'M';
        } else if (num >= 1e3) {
            return (num / 1e3).toFixed(2) + 'K';
        } else {
            return Math.floor(num).toString();
        }
    }
    
    loadGameState() {
        // Здесь будет загрузка состояния игры из localStorage или сервера
        console.log('Загрузка состояния игры...');
    }
}

// Функции для админ-панели
if (typeof window !== 'undefined') {
    window.adminAddResource = function(type, amount) {
        if (window.game) {
            amount = parseFloat(amount) || 0;
            switch(type) {
                case 'credits':
                    window.game.credits += amount;
                    break;
                case 'minerals':
                    window.game.minerals += amount;
                    break;
                case 'energy':
                    window.game.energy = Math.min(window.game.maxEnergy, window.game.energy + amount);
                    break;
            }
            window.game.updateUI();
        }
    };
    
    window.adminSetResource = function(type, amount) {
        if (window.game) {
            amount = parseFloat(amount) || 0;
            switch(type) {
                case 'credits':
                    window.game.credits = amount;
                    break;
                case 'minerals':
                    window.game.minerals = amount;
                    break;
                case 'energy':
                    window.game.energy = Math.min(window.game.maxEnergy, amount);
                    break;
            }
            window.game.updateUI();
        }
    };
    
    window.adminAddMillion = function() {
        if (window.game) {
            window.game.credits += 1000000;
            window.game.updateUI();
        }
    };
    
    window.adminMaxUpgrades = function() {
        console.log("Максимальные улучшения установлены");
    };
    
    window.adminUnlockAll = function() {
        console.log("Все разблокировано");
    };
    
    window.adminResetCurrent = function() {
        if (window.game) {
            window.game.credits = 100;
            window.game.minerals = 0;
            window.game.energy = window.game.maxEnergy;
            window.game.updateUI();
        }
    };
}
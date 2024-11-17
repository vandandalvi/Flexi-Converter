document.addEventListener('DOMContentLoaded', () => {
    const foodList = document.getElementById('food-list');
    const totalCaloriesElement = document.getElementById('total-calories');

    function updateTotalCalories() {
        const totalCalories = Array.from(foodList.children).reduce((sum, item) => {
            const calories = parseInt(item.getAttribute('data-calories'));
            return sum + calories;
        }, 0);
        totalCaloriesElement.textContent = totalCalories;
    }

    function saveToLocalStorage() {
        const foodItems = Array.from(foodList.children).map(item => ({
            food: item.getAttribute('data-food'),
            calories: parseInt(item.getAttribute('data-calories'))
        }));
        localStorage.setItem('foodItems', JSON.stringify(foodItems));
    }

    function loadFromLocalStorage() {
        const foodItems = JSON.parse(localStorage.getItem('foodItems')) || [];
        foodItems.forEach(item => addFoodItem(item.food, item.calories));
    }

    function addFoodItem(food, calories) {
        const listItem = document.createElement('li');
        listItem.setAttribute('data-food', food);
        listItem.setAttribute('data-calories', calories);
        listItem.innerHTML = `${food}: ${calories} calories <button onclick="removeFoodItem(this)">x</button>`;
        foodList.appendChild(listItem);
        updateTotalCalories();
        saveToLocalStorage();
    }

    document.getElementById('calorie-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const foodItem = document.getElementById('food').value;
        const calories = parseInt(document.getElementById('calories').value);

        if (!foodItem || isNaN(calories)) {
            alert('Please enter valid food item and calorie amount.');
            return;
        }

        addFoodItem(foodItem, calories);

        document.getElementById('food').value = '';
        document.getElementById('calories').value = '';
    });

    window.removeFoodItem = function(button) {
        const listItem = button.parentElement;
        listItem.remove();
        updateTotalCalories();
        saveToLocalStorage();
    };

    loadFromLocalStorage();
});
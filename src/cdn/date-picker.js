
document.addEventListener('DOMContentLoaded', () => {
    const getDaysArray = (start, end) => {
        for (var arr=[],dt=new Date(start); dt<=new Date(end); dt.setDate(dt.getDate()+1)){
            arr.push(new Date(dt));
        }
        return arr;
    };

    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 0); // 3 days before today
    const endDate = new Date(today);
    endDate.setDate(today.getDate() + 10); // 10 days after today

    const days = getDaysArray(startDate, endDate);
    const datePickerContainer = document.getElementById('single-date-picker-inside');
    const selectedDateInput = document.querySelector('.selected-date');
    const selectedDateText = document.querySelector('.selected-date-text');

    days.forEach((date, index) => {
        const dayWrapper = document.createElement('div');
        dayWrapper.className = `si-wrapper c-selectable-wrapper ${index === 0 ? 'selected' : ''}`;
        dayWrapper.dataset.index = index;

        const dayLabel = document.createElement('span');
        dayLabel.className = 'si-overline pb_x1 c-pb-16';
        dayLabel.textContent = date.toLocaleDateString('en-US', { weekday: 'short' });

        const dateLabel = document.createElement('span');
        dateLabel.className = 'selectable-item c-pt-11 px_x2';
        dateLabel.textContent = date.getDate();

        dayWrapper.appendChild(dayLabel);
        dayWrapper.appendChild(dateLabel);

        dayWrapper.addEventListener('click', () => {
            document.querySelectorAll('.si-wrapper').forEach(wrapper => wrapper.classList.remove('selected'));
            dayWrapper.classList.add('selected');
            const selectedDateStr = date.toLocaleDateString('en-US');
            selectedDateInput.value = selectedDateStr;
            selectedDateText.textContent = selectedDateStr;
        });

        datePickerContainer.appendChild(dayWrapper);
    });

    // Set initial selected date
    const initialDateStr = today.toLocaleDateString('en-US');
    selectedDateInput.value = initialDateStr;
    selectedDateText.textContent = initialDateStr;
});

  

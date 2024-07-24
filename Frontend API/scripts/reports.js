document.addEventListener('DOMContentLoaded', function() {
    console.log('Document loaded and script running.');
  
    function calculateTotals() {
      const rows = document.querySelectorAll('tbody tr');
      let totalWorkedTime = 0;
      let totalBreakTime = 0;
      let totalLunchTime = 0;
      let totalCoachingTime = 0;
      let totalConnectedTime = 0;
      let totalLogouts = 0;
        
      rows.forEach(row => {
        console.log('Processing row:', row);
        const workedTimeElement = row.querySelector('.worked-time');
        const breakTimeElement = row.querySelector('.break-time');
        const lunchTimeElement = row.querySelector('.lunch-time');
        const coachingTimeElement = row.querySelector('.coaching-time');
        const totalConnectedTimeElement = row.querySelector('.total-connected-time');
        const logoutsElement = row.querySelector('.logouts');
        
  
        let rowWorkedTime = parseFloat(workedTimeElement.innerText) || 0;
        let rowBreakTime = parseFloat(breakTimeElement.innerText) || 0;
        let rowLunchTime = parseFloat(lunchTimeElement.innerText) || 0;
        let rowCoachingTime = parseFloat(coachingTimeElement.innerText) || 0;
        let rowTotalConnectedTime = rowWorkedTime + rowBreakTime + rowLunchTime + rowCoachingTime;
        let rowLogouts = parseInt(logoutsElement.innerText) || 0;
        
        totalWorkedTime += rowWorkedTime;
        totalBreakTime += rowBreakTime;
        totalLunchTime += rowLunchTime;
        totalCoachingTime += rowCoachingTime;
        totalConnectedTime += rowTotalConnectedTime;
        totalConnectedTimeElement.innerText = rowTotalConnectedTime.toFixed(2);
        totalLogouts += rowLogouts;
      });
  
      console.log('Total Worked Time:', totalWorkedTime);
      console.log('Total Break Time:', totalBreakTime);
      console.log('Total Lunch Time:', totalLunchTime);
      console.log('Total Coaching Time:', totalCoachingTime);
      console.log('Total Connected Time:', totalConnectedTime);
      console.log('Total Logouts:', totalLogouts);
      
  
      document.querySelector('.total-worked-time').innerText = totalWorkedTime.toFixed(2);
      document.querySelector('.total-break-time').innerText = totalBreakTime.toFixed(2);
      document.querySelector('.total-lunch-time').innerText = totalLunchTime.toFixed(2);
      document.querySelector('.total-coaching-time').innerText = totalCoachingTime.toFixed(2);
      document.querySelector('.total-total-connected-time').innerText = totalConnectedTime.toFixed(2);
      document.querySelector('.total-logouts').innerText = totalLogouts;
    }
  
    calculateTotals();
  });
  
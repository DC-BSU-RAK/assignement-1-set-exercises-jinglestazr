// Function to calculate total petrol cost
function calculateTotal() {
    // Get input values
    const costPerLiter = parseFloat(document.getElementById('costPerLiter').value);
    const litersPurchased = parseFloat(document.getElementById('litersPurchased').value);
  
    // Calculate total cost
    const total = costPerLiter * litersPurchased;
  
    // Update the result text
    document.getElementById('totalCost').textContent = `Total cost: £${total.toFixed(2)}`;
  }
  
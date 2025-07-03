document.addEventListener('DOMContentLoaded', function() {
    const fetchBtn = document.getElementById('fetchBtn');
    const reloadBtn = document.getElementById('reloadBtn');
    const userContainer = document.getElementById('userContainer');
    const loadingElement = document.getElementById('loading');
    const errorElement = document.getElementById('error');
    const errorMessage = document.getElementById('errorMessage');
    const searchInput = document.getElementById('searchInput');
    const userCount = document.getElementById('userCount');
    const companyCount = document.getElementById('companyCount');
    const cityCount = document.getElementById('cityCount');

    let usersData = [];

    // Function to fetch user data
    async function fetchUserData() {
        try {
            // Show loading state
            loadingElement.classList.remove('hidden');
            errorElement.classList.add('hidden');
            userContainer.innerHTML = '';
            fetchBtn.disabled = true;
            reloadBtn.disabled = true;

            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            usersData = await response.json();
            displayUsers(usersData);
            updateStats(usersData);
            reloadBtn.disabled = false;
        } catch (error) {
            console.error('Error fetching data:', error);
            errorMessage.textContent = `Failed to fetch data: ${error.message}`;
            errorElement.classList.remove('hidden');
            fetchBtn.disabled = false;
        } finally {
            loadingElement.classList.add('hidden');
        }
    }

    // Function to display users
    function displayUsers(users) {
        userContainer.innerHTML = '';
        
        if (users.length === 0) {
            userContainer.innerHTML = '<div class="no-results">No users found matching your search.</div>';
            return;
        }

        users.forEach(user => {
            const userCard = document.createElement('div');
            userCard.className = 'user-card';
            
            userCard.innerHTML = `
                <div class="user-header">
                    <h3>${user.name}</h3>
                    <div class="email">${user.email}</div>
                </div>
                <div class="user-body">
                    <div class="user-detail">
                        <i class="fas fa-phone"></i>
                        <div class="user-detail-content">
                            <div class="user-detail-label">Phone</div>
                            <div class="user-detail-text">${user.phone}</div>
                        </div>
                    </div>
                    <div class="user-detail">
                        <i class="fas fa-map-marker-alt"></i>
                        <div class="user-detail-content">
                            <div class="user-detail-label">Address</div>
                            <div class="user-detail-text">
                                ${user.address.street}, ${user.address.suite}<br>
                                ${user.address.city}, ${user.address.zipcode}
                            </div>
                        </div>
                    </div>
                    <div class="user-detail">
                        <i class="fas fa-building"></i>
                        <div class="user-detail-content">
                            <div class="user-detail-label">Company</div>
                            <div class="user-detail-text">${user.company.name}</div>
                        </div>
                    </div>
                    <div class="user-detail">
                        <i class="fas fa-globe"></i>
                        <div class="user-detail-content">
                            <div class="user-detail-label">Website</div>
                            <div class="user-detail-text">
                                <a href="http://${user.website}" target="_blank">${user.website}</a>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            userContainer.appendChild(userCard);
        });
    }

    // Function to update statistics
    function updateStats(users) {
        userCount.textContent = users.length;
        
        const uniqueCompanies = [...new Set(users.map(user => user.company.name))];
        companyCount.textContent = uniqueCompanies.length;
        
        const uniqueCities = [...new Set(users.map(user => user.address.city))];
        cityCount.textContent = uniqueCities.length;
    }

    // Function to filter users
    function filterUsers() {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredUsers = usersData.filter(user => 
            user.name.toLowerCase().includes(searchTerm) || 
            user.email.toLowerCase().includes(searchTerm) ||
            user.address.city.toLowerCase().includes(searchTerm) ||
            user.company.name.toLowerCase().includes(searchTerm)
        );
        displayUsers(filteredUsers);
    }

    // Event listeners
    fetchBtn.addEventListener('click', fetchUserData);
    reloadBtn.addEventListener('click', fetchUserData);
    searchInput.addEventListener('input', filterUsers);

    // Optional: Fetch data automatically when page loads
    // fetchUserData();
});

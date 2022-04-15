let nav = 0;
let clicked = null;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];


const calendar = document.getElementById('calendar');
const newEventModal = document.getElementById('newEventModal');
const deleteEventModal = document.getElementById('deleteEventModal');
const modalBackDrop = document.getElementById('modalBackDrop');
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const eventTitleInput = document.getElementById('eventTitleInput');

function openModal(date){
    clicked =  date;

    const eventForDay = events.find(e => e.date === clicked);
    if (eventForDay) {
        // console.log('Event alreaay exists');
        document.getElementById('eventText').innerText = eventForDay.title;
        deleteEventModal.style.display = 'block';
    } else {
        newEventModal.style.display = 'block';
    }   
modalBackDrop.style.display = 'block';
}


    function load(){
    const dt = new Date();

    if(nav!==0){
        dt.setMonth(new Date().getMonth() + nav);
    }

    const day = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth =  new Date(year, month, 1);
    const dateString = firstDayOfMonth.toLocaleDateString('en-uk', {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    });
    // console.log((dt.getMonth() + 1) + ' dt.getMonth');
    // console.log(day, month, year);
    // console.log(daysInMonth + ' here');
    // console.log(new Date(year, month, 1).getMonth() + ' aaah');
    //  console.log(dateString + ' date String');


    const paddingDays = weekDays.indexOf(dateString.split(', ')[0]); 
    document.getElementById('monthDisplay').innerText =`${dt.toLocaleDateString(`en-in`, {month:'long'})} ${year}`;

    // console.log(paddingDays+ ' paddingDays');
    calendar.innerHTML = '';


    for(let i = 1; i <= paddingDays + daysInMonth; i++){
            const daySquare = document.createElement('div');
            daySquare.classList.add('day');
            const dayString = `${i - paddingDays}/${month+1}/${year}`;
            
            if (i > paddingDays) {
                daySquare.innerText = i - paddingDays;

                const eventForDay = events.find(e=> e.date === dayString);

                if (i - paddingDays === day && nav === 0) {
                      daySquare.id = 'currentDay';
                }
                if(eventForDay){
                    const eventDiv = document.createElement('div');
                    eventDiv.classList.add('event');
                    eventDiv.innerText = eventForDay.title;
                    daySquare.appendChild(eventDiv);
                }

                daySquare.addEventListener('click', () => openModal(dayString));
                // console.log(dayString + ' dayString');

            } 
            else {
                daySquare.classList.add('padding')
            }
            
            calendar.appendChild(daySquare);
    }
    console.log(paddingDays + ' paddingDays');
}


function saveEvent(){
    if(eventTitleInput.value){
        eventTitleInput.classList.remove('error');

        events.push({
            date: clicked,
            title: eventTitleInput.value,
        });

        localStorage.setItem('events', JSON.stringify(events));
        closeModal();
    }
}

function closeModal(){
    newEventModal.style.display = "none";
    deleteEventModal.style.display = "none";
    modalBackDrop.style.display = "none";
    eventTitleInput.value = "";
    clicked = null;
    load();
}

function deleteEvent(){
    events = events.filter( e => e.date !== clicked);
    localStorage.setItem('events', JSON.stringify(events));
    closeModal();
}

function initButtons(){
    document.getElementById('nextButton').addEventListener('click', () => {
        nav++;
        load();
    })
};

document.getElementById('backButton').addEventListener('click', () => {
    nav--;
    load();
});
document.getElementById('saveButton').addEventListener('click', saveEvent);
document.getElementById('cancelButton').addEventListener('click', closeModal);

document.getElementById('deleteButton').addEventListener('click', deleteEvent);
document.getElementById('closeButton').addEventListener('click', closeModal);
    initButtons();
load();


 













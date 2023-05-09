import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import { List } from './List';

const towers = ['A', 'B']
const floors = Array(25).fill().map((floor, i) => i + 3)
const rooms = Array(10).fill().map((room, i) => i + 1)


function addMinutes(time, mins) {
	let d = new Date(time.getTime() + mins * 60000);
	return [
		addZero(d.getUTCHours()),
		addZero(d.getUTCMinutes()),
	].join(":");
}

function addZero(n) { return n > 9 ? n : "0" + n; }

function App() {
	const [selectedTower, setSelectedTower] = useState("")
	const [selectedFloor, setSelectedFloor] = useState(0)
	const [selectedRoom, setSelectedRoom] = useState(0)

	const [selectedDate, setSelectedDate] = useState("")
	const [selectedTime, setSelectedTime] = useState("")

	const [inputCommentary, setInputCommentary] = useState("")


	const currentTower = useRef(null)
	const currentFloor = useRef(null)
	const currentRoom = useRef(null)
	const currentDate = useRef(null)
	const currentTime = useRef(null)

	const currentCommentary = useRef("")

	const dateInput = useRef("")
	const timeInput = useRef("")

	const commentaryInput = useRef("")

	useEffect(() => {
		currentTower.current.textContent = selectedTower || ""
		currentFloor.current.textContent = selectedFloor || ""
		currentRoom.current.textContent = selectedRoom || ""
		currentDate.current.textContent = selectedDate || ""
		currentTime.current.textContent = selectedTime || ""



	}, [selectedTower, selectedFloor, selectedRoom, selectedDate, selectedTime])

	const clearInformation = (e) => {
		e.preventDefault()

		setSelectedTower("")
		setSelectedFloor("")
		setSelectedRoom("")
		setSelectedDate("")
		setSelectedTime("")

		dateInput.current.value = ""
		timeInput.current.value = ""
		commentaryInput.current.value = ""


	}

	const onSendInfo = (e) => {
		e.preventDefault()

		if (selectedTower && selectedFloor && selectedRoom && selectedDate && selectedTime) {
			const data = JSON.stringify(
				{
					tower: selectedTower,
					floor: selectedFloor,
					room: selectedRoom,
					date: selectedDate,
					time: selectedTime,
					commentary: inputCommentary
				})

			console.log(data)
			return data
		}
		else
			return false
	}

	return (
		<div className="App">
			<header className="App-header">
				<main className='App-content'>
					<form className='result'>
						<h2>Приглашение на чай: </h2>
						<div className="result__item">
							<p>Башня: <span className='item__info' ref={currentTower}></span></p>
							<List data={towers} setter={setSelectedTower} /></div>
						<div className="result__item">
							<p>Этаж: <span className='item__info' ref={currentFloor}></span></p>
							<List data={floors} setter={setSelectedFloor} /></div>
						<div className="result__item">
							<p>Комната: <span className='item__info' ref={currentRoom}></span></p>
							<List data={rooms} setter={setSelectedRoom} /></div>
						<div className="result__item">
							<p>Дата: <span className='item__info' ref={currentDate}></span></p>
							<p>Время: <span className='item__info' ref={currentTime}></span></p>

							<div className='meeting'>
								<input
									ref={dateInput}
									type='date'
									className='date'
									onChange={(e) => setSelectedDate(e.target.value)}></input>
								<input
									ref={timeInput}
									type='time'
									className='time'
									onChange={(e) => {
										const value = e.target.value + "-" + addMinutes(e.target.valueAsDate, 60)

										setSelectedTime(value)
									}}></input>
							</div>
						</div>
						<div className='sub'>

							<div className='commentary' >
								<p>Комментарий: <span ref={currentCommentary}></span></p>
								<textarea ref={commentaryInput} onInput={(e) => setInputCommentary(e.target.value)} />
							</div>

							<button className='send' onClick={onSendInfo}>Отправить</button>
							<button className='clear' onClick={clearInformation}>Очистить</button>

						</div>
					</form>
				</main>
			</header>
		</div>
	);
}

export default App;

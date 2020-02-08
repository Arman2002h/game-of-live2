window.onload = ()=>{
	document.querySelector('#up').onclick = ()=>{
		AjaxPost('/up',undefined,document.querySelector('input[type=number]').value);
	}
	document.querySelector('#down').onclick = ()=>{
		AjaxPost('/down',undefined,document.querySelector('input[type=number]').value);
	}
	document.querySelector('#left').onclick = ()=>{
		AjaxPost('/left',undefined,document.querySelector('input[type=number]').value);
	}
	document.querySelector('#right').onclick = ()=>{
		AjaxPost('/right',undefined,document.querySelector('input[type=number]').value);
	}
	document.querySelector('#rm').onclick = ()=>{
		AjaxPost('/randomMatrix');
	}
	document.querySelector('#stp').onclick = ()=>{
		AjaxPost('/stp');
	}
	document.querySelector('#weather').onclick = ()=>{
		w+=parseInt(document.querySelector('input[type=number]').value)
	}
}
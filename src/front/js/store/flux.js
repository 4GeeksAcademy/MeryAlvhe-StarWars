const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				},
				
			],
			characters:[{}],
			species: [{}],
			vehicles: [{}],
			planets: [{}],
			currentUserId:'',
			currentUser:[{}],
			currentUserProperties:[{}],
			counter: 0,
			favorites: [],
			


		},
		actions: {
			// Use getActions to call a function within a fuction
			incrementar: () =>{
				setStore({counter:getStore().counter+1})
			},
			decrementar: () =>{
				setStore({counter: getStore().counter-1})
			},
			addFavorites: (text) =>{
				setStore({favorites: [...getStore().favorites, text]})
			},
			removeFavorites: (remove) =>{
				setStore({favorites: getStore().favorites.filter((item)=> item != remove)})
				
			},
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			getUsersSW: async () =>{
				const response = await fetch ('https://www.swapi.tech/api/people/');
				if (!response.ok) {
					console.log('Error');
					return
				}
				const data = await response.json();
				setStore({characters: data.results})
			},
			getSpecies: async () => {
				const response = await fetch ('https://www.swapi.tech/api/species');
				if (!response.ok) {
					console.log('Error');
					return
				}
				const data = await response.json();
				setStore({species: data.results})
			}, 
			getVehicles: async () => {
				const response = await fetch ('https://www.swapi.tech/api/vehicles');
				if (!response.ok){
					console.log ('Error');
					return
				}
				const data = await response.json();
				setStore({vehicles: data.results})
			},
			getPlanets: async () => {
				const response = await fetch ('https://www.swapi.tech/api/planets');
				if (!response.ok){
					console.log('Error');
					return
				}
				const data = await response.json();
				setStore({planets: data.results})
			},
			settingCurrentUser: (text)=> {setStore({currentUserId: text})}, 
			getCurrenUser: async ()=>{
				const uri = getStore().currentUserId;
				const response = await fetch (uri);
				if (!response.ok){
					console.log('Error');
					return
				}
				const data = await response.json();
				console.log(data)
				setStore({currentUser: data.result})
				setStore({currentUserProperties: data.result.properties})
			}

		}
	};
};

export default getState;

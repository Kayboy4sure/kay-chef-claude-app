import { useState, useEffect, useRef } from "react";
import ChefData from "./Chef-data";
import RecipeElement from "./Recipe";
// import data from "../data/chef-data"
import { GetRecipeFromOpenrouter } from "./../data/ai";


export default function BodyContent() {
    const [listofingredient, setlistofingredient] = useState(['raw rice', 'fish', 'meat', 'groundnut oil'])
    const [showrecipedata, setshowrecipedata] = useState(null)
    
    function AddIngredient(formData) {
        const ingredientvalue = formData.get("addingredient")
        // making a new list that will be replace the current one
        const copyoflist = [...listofingredient]
        copyoflist.push(ingredientvalue)
        // rendering the new list
        setlistofingredient(copyoflist);
        console.log(copyoflist);
    }

    async function DataRecipe() {
        const responsedata = await GetRecipeFromOpenrouter(listofingredient)
        console.log(responsedata)
        setshowrecipedata(responsedata)
    }

    const scrollid = useRef(null)

    useEffect(()=>{
        if (scrollid.current !== null) {
            scrollid.current.scrollIntoView({behavior:'smooth'});
        }
    }, [showrecipedata])

    function RemoveIngredient(event) {
        console.log(event)
        const copyoflist = listofingredient.filter(ingredient=> event!==ingredient)
        // rendering the new list
        setlistofingredient(copyoflist);
        console.log(copyoflist);
    }

    return (
        <main>
            <form action={AddIngredient}>
                <input type="text" name="addingredient" required placeholder="e.g rice"/>
                <button type="submit">+ Add Ingradient</button>
            </form>
            <RecipeElement listofingredient={listofingredient} DataRecipe={DataRecipe} RemoveIngredient={RemoveIngredient}/>
            {showrecipedata && <ChefData showrecipedata={showrecipedata} ref={scrollid}/>}
        </main>
    )
}

// {showrecipedata && <ChefData />}
export default function RecipeElement(props) {
    const ingredientelements = props.listofingredient.map(item => {
        return (<li key={item}><button onClick={()=>{props.RemoveIngredient(item)}}>{item}</button></li>)
    })

    function RenderButton(props) {
        return (
            <div>
                <div>
                    <h3>Ready for the recipe</h3>
                    <p>Generate a recipe from the list of Ingradients</p>
                </div>
                <input type="button" onClick={props.DataRecipe} value="Get a Recipe" />
            </div>
        )
    }
    
    return (
        <section>
            {props.listofingredient.length > 0 && 
            <>
                <h1>Ingredients on hand :</h1>
                <em>Note: To delete any ingredient you just have to click on it.</em>
            </>}
            <ul>
                {ingredientelements}
            </ul>
            {props.listofingredient.length > 3 ? <RenderButton DataRecipe={props.DataRecipe}/> : null }
        </section>
    )
}
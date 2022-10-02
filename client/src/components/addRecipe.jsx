export default function AddRecipe() {
    return <form>
        <label htmlFor="name">Recipe name: </label>
        <input type="text" name='name' id='name'/>
        <label htmlFor="health-score">Health score: </label>
        <input type="text" name='health-score' id='health-score'/>
        <input type="submit" value='Create'/>
    </form>
}
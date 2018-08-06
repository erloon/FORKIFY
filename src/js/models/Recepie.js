import axios from "axios";
import {
    key,
    proxy
} from '../config';

export default class Recipe {
    constructor(id) {
        this.id = id;

    }

    async getRecipe() {
        const parameters = `key=${key}&rId=${this.id}`;
        const link = 'http://food2fork.com/api/get?';

        try {
            const retval = await axios(`${proxy}${link}${parameters}`);

            this.title = retval.data.recipe.title;
            this.author = retval.data.recipe.publisher;
            this.img = retval.data.recipe.image_url;;
            this.url = retval.data.recipe.source_url;
            this.ingredients = retval.data.recipe.ingredients;
        } catch (error) {
            alert(error);
        }
    }

    calcTime() {
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng / 3);
        this.time = periods * 15;
    }

    calcServings() {
        this.servings = 4;
    }

    parseIngredients() {
        const unitsLongs = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups',
        'cup', 'pounds','pound'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'cup','pound','pound'];

        const newIngredients = this.ingredients.map(el => {

            let ingredient = el.toLowerCase();
            unitsLongs.forEach((unit, i) => {

                ingredient = ingredient.replace(unit, unitsShort[i]);
            });

            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

            const arrIng = ingredient.split(' ');
            const unitIndex = arrIng.findIndex(el => unitsShort.includes(el));

            let objIng;

            if (unitIndex > -1) {

                const arrCount = arrIng.slice(0, unitIndex);
                let count;

                if(arrCount.length ===1){
                    count = eval(arrIng[0].replace('-','+'));
                }
                else{
                    count = eval(arrIng.slice(0, unitIndex).join('+'));
                }

                objIng = {
                    count,
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex+1).join(' ')
                };

            } else if (parseInt(arrIng[0], 10)) {
                //debugger;
                objIng = {
                    count: parseInt(arrIng[0], 10),
                    unit: '',
                    ingredient: arrIng.slice(1).join(' ')
                };
            } else if (unitIndex === -1) {
                objIng = {
                    count: 1,
                    unit: '',
                    ingredient
                };
            }

            return objIng;
        });

        this.ingredients = newIngredients;
    }
}
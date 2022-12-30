<script>
  import { categoryStore } from '@/stores/category'

  export default {
    setup() {
      const categoriesStore = categoryStore();

      return { categoriesStore }
    },
    data() {
      return {
        categories: this.categoriesStore.categories,

        highlightedIds: [],

        initialSearchPhrase: '',
        selectedSearchPhrase: '',  

        initialCategories: [],
        selectedCategories: [],

        submit: false,
        submittedCats: []
      }
    },
    created() {
      this.initialCategories = this.categories;
    },
    methods: {
      highlightOption(id) {
        this.highlightedIds.indexOf(id) >= 0 ? this.highlightedIds.splice(this.highlightedIds.indexOf(id), 1) : this.highlightedIds.push(id);
        
        let targetOption = this.initialCategories.find(x => x.id === id);
        targetOption.highlighted = !targetOption.highlighted;
      },
      filteredActiveCategories() {
        let phrase = this.initialSearchPhrase.toLowerCase();
        let results = this.initialCategories.filter((item) => (item.name.toLowerCase().includes(phrase) && item.status == 'active'));
        return results;
      },
      filteredSelectedCategories() {
        let phrase = this.selectedSearchPhrase.toLowerCase();
        let results = this.initialCategories.filter((item) => (item.name.toLowerCase().includes(phrase) && item.status == 'selected'));
        return results;
      },
      highlightedTo(status) {
        let removedIds = [];

        for(let i = 0; i < this.highlightedIds.length; i++) {
          let targetOption = this.initialCategories.find(x => x.id === this.highlightedIds[i]);

          if(status == 'active' && targetOption.status == 'selected') {
            targetOption.status = 'active';
            targetOption.highlighted = !targetOption.highlighted;
            removedIds.push(targetOption.id);
          }

          if(status == 'selected' && targetOption.status == 'active') {
            targetOption.status = 'selected';
            targetOption.highlighted = !targetOption.highlighted;
            removedIds.push(targetOption.id);
          }
        }
        for(let x = 0; x < removedIds.length; x++) {
          if(this.highlightedIds.indexOf(removedIds[x]) >= 0) {
            this.highlightedIds.splice(this.highlightedIds.indexOf(removedIds[x]), 1);
          }
        }
      },
      allToInitial() {
        this.initialCategories.forEach((item) => item.status = 'active');
      },
      allToSelected() {
        this.initialCategories.forEach((item) => item.status = 'selected');
      },
      handleSubmit() {
        this.submit = true;
        this.submittedCats = this.filteredSelectedCategories();
        this.allToInitial();
      },
      reset() {
        this.submit = false;
        this.submittedCats = [];
      }
    }
  }
</script>

<template>
  <main>
    <div class="container">
      <div class="row">
        <div class="col-md-5">
          <div class="mb-3">
            <label for="SearchForCategory" class="form-label">Category</label>
            <div class="input-holder">
              <input type="text" class="form-control" id="SearchForCategory" placeholder="Search" v-model="initialSearchPhrase" />
              <span class="reset-phrase material-symbols-outlined" @click="initialSearchPhrase = ''" v-if="initialSearchPhrase">close</span>
            </div>
          </div>
          <div class="option-holder">
            <span
              class="option"
              :class="{'highlighted': category.highlighted}"
              v-for="(category, index) in filteredActiveCategories()"
              :key="index"
              @click="highlightOption(category.id)">
                {{ category.name }}
            </span>
          </div>
        </div>
        <div class="col-md-2">
          <div class="controls">
            <button type="button" class="btn btn-primary" @click="allToSelected()" title="Select all">
              <span class="material-symbols-outlined">keyboard_double_arrow_right</span>
            </button>
            <button type="button" class="btn btn-light">
              <span class="material-symbols-outlined" @click="highlightedTo('selected')" title="Select highlighted">keyboard_arrow_right</span>
            </button>
            <button type="button" class="btn btn-light" @click="highlightedTo('active')" title="Unselect highlighted">
              <span class="material-symbols-outlined">keyboard_arrow_left</span>
            </button>
            <button type="button" class="btn btn-primary" @click="allToInitial()" title="Unselect all">
              <span class="material-symbols-outlined">keyboard_double_arrow_left</span>
            </button>
          </div>
        </div>
        <div class="col-md-5">
          <div class="mb-3">
            <label for="SearchForCategory" class="form-label invisible">Category</label>
            <div class="input-holder">
              <input type="text" class="form-control" id="SearchForCategory" v-model="selectedSearchPhrase" placeholder="Search" />
              <span class="reset-phrase material-symbols-outlined" @click="selectedSearchPhrase = ''" v-if="selectedSearchPhrase">close</span>
            </div>
          </div>
          <div class="option-holder">
            <span
              class="option"
              :class="{'highlighted': selectedCat.highlighted }"
              v-for="(selectedCat, index) in filteredSelectedCategories()"
              :key="index"
              @click="highlightOption(selectedCat.id)">
                {{ selectedCat.name }}
            </span>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <button class="btn btn-primary m-4" @click="handleSubmit()" title="Submit">Submit</button>
          <button class="btn btn-primary mt-4 mb-4" @click="reset()" v-if="submit" title="Reset">Reset</button>
          <div class="results" v-if="submit && submittedCats.length > 0">
            <h5>Selected Categories:</h5>
            <div v-for="(cat, index) in submittedCats" :key="index">{{cat.name}}</div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

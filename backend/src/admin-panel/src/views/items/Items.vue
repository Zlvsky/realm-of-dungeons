<template>
  <div class="container mt-5 content-wrap-lg">
    <h1>Add New Item</h1>
    <form class="d-flex flex-column gap-3" @submit.prevent="submitForm">
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" class="form-control" id="name" v-model="item.name" required>
      </div>

      <div class="form-group">
        <label for="type">Type:</label>
        <select class="form-control" id="type" v-model="item.type" required>
          <option value="weapon">Weapon</option>
          <option value="armor">Armor</option>
          <option value="potion">Potion</option>
        </select>
      </div>

      <div class="form-group">
        <label for="subType">Sub Type:</label>
        <input type="text" class="form-control" id="subType" v-model="item.subType">
      </div>

      <div class="form-group" v-if="item.type === 'weapon'">
        <label for="minDamage">Min Damage:</label>
        <input type="number" class="form-control" id="minDamage" v-model="item.minDamage">
      </div>

      <div class="form-group" v-if="item.type === 'weapon'">
        <label for="maxDamage">Max Damage:</label>
        <input type="number" class="form-control" id="maxDamage" v-model="item.maxDamage">
      </div>

      <div class="form-group" v-if="item.type === 'armor'">
        <label for="armor">Armor Value:</label>
        <input type="number" class="form-control" id="armor" v-model="item.armor">
      </div>

      <div class="form-group" v-if="item.type === 'armor' || item.type === 'weapon'">
        <label>Statistics:</label>
        <div class="row">
          <div class="col">
            <input type="text" class="form-control" v-model="item.statistics.strength" placeholder="Strength">
          </div>
          <div class="col">
            <input type="text" class="form-control" v-model="item.statistics.condition" placeholder="Condition">
          </div>
          <div class="col">
            <input type="text" class="form-control" v-model="item.statistics.dexterity" placeholder="Dexterity">
          </div>
        </div>
        <div class="row mt-2">
          <div class="col">
            <input type="text" class="form-control" v-model="item.statistics.wisdom" placeholder="Wisdom">
          </div>
          <div class="col">
            <input type="text" class="form-control" v-model="item.statistics.intelligence" placeholder="Intelligence">
          </div>
          <div class="col">
            <input type="text" class="form-control" v-model="item.statistics.charisma" placeholder="Charisma">
          </div>
        </div>
      </div>

      <div class="form-group">
        <label for="image">Image URL:</label>
        <input type="text" class="form-control" id="image" v-model="item.image" required>
      </div>

      <div class="form-group">
        <label for="value">Value:</label>
        <input type="number" class="form-control" id="value" v-model="item.value">
      </div>

      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
import { createItemService } from "../../client/services/items/createItemService.js";

export default {
  name: "login-page",
  components: {},
  data() {
    return {
      item: {
        name: '',
        type: 'weapon',
        subType: null,
        minDamage: null,
        maxDamage: null,
        image: '',
        armor: null,
        statistics: {
          strength: null,
          condition: null,
          dexterity: null,
          wisdom: null,
          intelligence: null,
          charisma: null,
        },
        value: null,
      },
    };
  },
  methods: {
    async submitForm() {
      const response = await createItemService(this.item);
      if (response.status !== 200) return console.log("fail");
      this.item = {
        name: '',
        type: 'weapon',
        subType: null,
        minDamage: null,
        maxDamage: null,
        image: '',
        armor: null,
        statistics: {
          strength: null,
          condition: null,
          dexterity: null,
          wisdom: null,
          intelligence: null,
          charisma: null,
        },
        value: null,
      };
    },
  },
};
</script>


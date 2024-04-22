
<script lang="ts">
  import axios from 'axios'; 
  import { onMount } from 'svelte'; 

  let currency1 = 'USD'; 
  let currency2 = 'EUR'; 
  let amount1 = 0; 
  let amount2 = 0; 
 let rates = 0;

   const request = async (curr1: string , curr2: string ) => { 
    const url = `https://v6.exchangerate-api.com/v6/52ab6a97586efbd7b696e529/pair/${curr1}/${curr2}`; 
    const response = await axios.get(url); 
   return response.data.conversion_rate; 
  }; 
  onMount(async() => { 
   rates = await request('USD', 'EUR'); 
  }); 

  function convertCurrency(input: string) { 
  console.log(rates)
    if (input === '1') { 
      amount2 = amount1 * rates; //  для конвертации USD в EUR 
    } else { 
      amount1 = amount2 / rates; // для конвертации EUR в USD 
    } 
  } 


const onChange = async (e: any, curr: string) => { 

  curr = e.target.value; 
  if (curr === 'USD') { 
    currency1 = 'USD'; 
  } else { 
    currency1 = 'EUR'; 
  } 
  rates = await request(currency1, currency2); 
  convertCurrency('1'); 
  console.log(currency1, currency2); 
}

</script>

<h1>Currency Converter</h1>

<input type="number" bind:value={amount1} on:input={() => convertCurrency('1')} /> 
<select on:change={(e) => onChange(e , currency1)} bind:value={currency1}> 
  <option value="USD">USD</option> 
  <option value="EUR">EUR</option> 
</select> 
<br> 
<input type="number" bind:value={amount2} on:input={() => convertCurrency('2')} /> 
<select on:change={(e) => onChange(e, currency2)} bind:value={currency2}> 
  <option value="USD">USD</option> 
  <option value="EUR">EUR</option> 
</select>

<style> 
  input { 
    margin-bottom: 15px; 
  } 
</style> 


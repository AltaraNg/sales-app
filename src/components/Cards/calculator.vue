<template>
    <div class=" lg:w-2/5 w-full  bg-white lg:flex-col pb-16  rounded lg:my-20 my-0 lg:mx-20 mx-0 h-full  hover:shadow-2xl">
          <h3 class=" tracking-wider mb-32 leading-6 text-2xl font-bold text-center px-8 mt-16 text-black  ">
                   Your initial payment is <br><p class="underline pt-8"> ₦20,900.00</p>
         </h3>
         <Result type="Monthly Repayment" amount="₦ 11,500.00" />
         <Result type="Total Repayment" amount="₦ 124,956.00" />
         <Result type="Total Product Price" amount="₦ 147,500.00"  />
        </div>
</template>

<script>
import Result from "@/components/Results/"
export default {
    components:{
       Result 
    }
    
}
</script>>
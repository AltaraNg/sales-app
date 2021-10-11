const calculate = (productPrice, data, params, repayment_duration) => {
    if(!params)return {total: 0, actualDownpayment:0, actualRepayment:0, biMonthlyRepayment:0}
    const count = repaymentCount(
        
        repayment_duration,
        14
    );
    const marketPrice = Math.floor(productPrice * (1 + params.margin))
    const downPay = Math.floor((data.percent / 100) * marketPrice);
    const residual = Math.floor(marketPrice - downPay);
    const tempInstallment = residual / count;
    const tempInterest = residual * (params.interest / 100);
    const totalTempInterest = (tempInstallment * count) + (tempInterest * count) + downPay;
    const labelPrice = totalTempInterest * (1 + params.tax / 100);
    let total = labelPrice;
    const initDownpayment = ((data.percent / 100) * total);
    const downpayment = initDownpayment + (Math.floor(((total - initDownpayment) / count)) * data.plus);
    const actualDownpayment = Math.floor(downpayment / 100) * 100;
    const actualRepayment = total - downpayment;

    if(params.business_type_id ==1 ){
        var   biMonthlyRepayment = Math.floor((actualRepayment/count)/100)*100
    }else{
       var   biMonthlyRepayment = Math.round((actualRepayment/count)/100)*100 
    }
    total = Math.ceil(labelPrice / 100) * 100;
    
    return { total, actualDownpayment, actualRepayment, biMonthlyRepayment };

};


const repaymentCount = (days, cycle) => {
    const result = days / cycle;
    if (result >= 24) {
        return 24;
    } else if (result >= 12) {
        return 12;
    }
    if (result >= 6) {
        return 6;
    }
    return 3;
};

const cashLoan = (productPrice, data, params, repayment_duration) => {
    if(!params)return {total: 0, actualDownpayment:0, actualRepayment:0, biMonthlyRepayment:0}
  const count = repaymentCount(
    repayment_duration,
    14            
  );
  const actualDownpayment = (data.percent / 100) * productPrice;
  const residual = productPrice - actualDownpayment;
  const principal = residual / count;
  const interest = (params.interest / 100) * residual;
  const actualRepayment = (principal + interest) * count;
  let total =  Math.ceil((actualDownpayment + actualRepayment)/100) *100;
  var   biMonthlyRepayment = Math.round((actualRepayment/count)/100)*100 ;
    return { total, actualDownpayment, actualRepayment, biMonthlyRepayment };
}

export { calculate, cashLoan };
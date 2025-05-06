import axios from 'axios';
import { convertPersianToEnglish } from '../../utils/convertPersianToEnglish'; 

const fetchEuroPrice = async () => {
  try {
    const response = await axios.get('http://localhost:3001/api/euro-price');
    const priceInPersian = response.data.price; 
    console.log('✅ Euro price from scraper:', priceInPersian);


    const priceInEnglish = convertPersianToEnglish(priceInPersian);
    console.log('✅ Converted Euro price:', priceInEnglish);

    
    const euroToToman = parseFloat(priceInEnglish);
    console.log('💸 Final Euro price:', euroToToman);

    return euroToToman;
  } catch (error) {
    console.error('❌ Error fetching Euro rate from local scraper API:', error);
    return null;
  }
};

export default fetchEuroPrice;

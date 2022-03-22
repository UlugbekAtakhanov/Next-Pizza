
import PizzaCard from '../../PizzaCard';

const PizzaList = ({pizzaList}) => {
    return (
        <div className=''>
            <div className="xl:container xl:mx-auto py-12 px-4 text-center">
                <h1 className='text-black text-3xl md:text-5xl uppercase font-bold'>the best pizza in town</h1>
                <p className='text-[#444] my-4 sm:w-[70%] sm:mx-auto'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, quia maxime corrupti cumque accusantium quo veniam similique, voluptatibus iure eaque eveniet obcaecati commodi quas officia dignissimos voluptatem dolore consequatur! Qui?</p>
                
                <div className='flex flex-col items-center gap-8 py-4 sm:flex-row sm:flex-wrap sm:justify-center'>
                    {pizzaList?.map((pizza) => {
                        return <PizzaCard pizza = {pizza} key = {pizza._id}/>
                    })}
                    
                </div>

            </div>
        </div>
    );
}

export default PizzaList;
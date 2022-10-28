import "./InputRow.css"
interface InputParameter{
    id: string;
    name: string;
    type: string;
    placeholder: string;
}
export default function InputRow(props: InputParameter){
    return (
                <div className="mb-6">
                  <input
                    id={props.id}
                    name={props.name}
                    type={props.type}
                    required
                    placeholder={props.placeholder}
                    className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border focus:outline-none focus:ring text-xl font-light"
                  />
                  {if (props.type=="password"){
                    
                  } }
    </div>
)
}
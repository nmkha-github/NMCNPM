import "./InputRow.css"
interface InputParameter{
    id: string;
    name: string;
    type: string;
    placeholder: string;
}
function showHidePassword(){
    var input=document.querySelector<HTMLInputElement>('.input[name="password"]');
    var button=document.querySelector<HTMLButtonElement>('#showHideButton');
    console.log(button);
    if(input&&button){
      if(input.type==="password"){
        input.type="text";
        button.innerText="hide";
      }
      else{
        input.type="password";
        button.innerText="show";
      }
    }
}
function renderShowPassword(name: String){
  if(name==="password"){
      return (
        <div className="absolute inset-y-0 right-0 flex items-center">
      <button 
        id="showHideButton"
        type="button"
        className="group relative flex w-full justify-center rounded-3xl border border-transparent py-0 px-2 text-sm font-medium"
        onClick={showHidePassword}
      >
        show
      </button>
      </div>) 
  }
}
export default function InputRow(props: InputParameter){
    return (
                <div className="relative mb-6">
                  <input
                    id={props.id}
                    name={props.name}
                    type={props.type}
                    placeholder={props.placeholder}
                    required
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-black placeholder-gray-500 focus:z-10 focus:border-500 focus:outline-none focus:ring-500 text-xl font-normal input active:outline-none"
                  />
                  {renderShowPassword(props.name)}
                  </div>
)
}
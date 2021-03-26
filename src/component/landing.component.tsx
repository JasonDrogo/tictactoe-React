import React, { Component } from 'react';
import './landing.component.css';
class Landing extends Component{ 
    constructor(props){
        super(props);
        }

        state = {
          arraySize :  3,
          boxArray : [[]],
         turnNumber : 1,
         wontext : null,
          }

          componentDidMount(){
this.setState({arraySize : 3});
          }

          setboxArray(size){

          this.setState({
            arraySize : size,
            wontext : null,
            turnNumber :1,
            boxArray :  new Array(size).fill(null).map(() => new Array(size).fill(null))

          })
          }


          checkIfWon(){
 
            let sign   =null;
          let firstdiagnolMatch  =-1;
          let seconddiagnolMatch  =-1;
         let  verticalArrayMatch =JSON.parse(JSON.stringify(this.state.boxArray[0]));
            for(let i=0 ; i< this.state.boxArray.length;i++){
              if(sign != null){
                break;
              }
              let a = this.state.boxArray[i][0];
            sign =   (a != 'null') ?   (this.state.boxArray[i].every((sign )=> (sign == a)  ) ? a : null ) : null;
            
        
        
            // firstVerticalRowCheck
        
        if(i>0){
        
          this.state.boxArray[i].forEach((a, index ) =>{ 
            if(a !=  verticalArrayMatch[index]){
        verticalArrayMatch[index]=null;
        
            }
          })
        }
        
        
            // First diagnol check
            let first = this.state.boxArray[0][0];
            let c = this.state.boxArray[i][i]
            
        if(first == c && firstdiagnolMatch != 0){
        firstdiagnolMatch = 1;
        }
        else{
          firstdiagnolMatch = 0;
        }
        
        
        
        
        // second diagnol check
        let length  = this.state.boxArray.length;
        let last = this.state.boxArray[0][length-1];
        let rightdiagnol = this.state.boxArray[i][length-(i+1)];
        
        if(last == rightdiagnol && seconddiagnolMatch != 0){
          seconddiagnolMatch = 1;
          }
          else{
            seconddiagnolMatch = 0;
          }
        
         // if any diagnol match 
        if(i == this.state.boxArray.length-1){
        if(firstdiagnolMatch == 1){
        sign = this.state.boxArray[0][0];
        }
        else if(seconddiagnolMatch == 1){
          sign = this.state.boxArray[0][length-1];
        }
        
        else {
         
        let a = verticalArrayMatch.findIndex((value ) => value != null);
        if(a != -1){
          sign = verticalArrayMatch[a];
        }
        }
        }
        
        
            
        
            }
   
        
         if(sign != null){
           if(sign == 'X'){
             this.state.wontext ='Player 1 Won';
           }
           else{
            this.state.wontext ='Player 2 Won';
           }
         }
          }

          turn(index1 , index2 ,event  ){
            let box  = this.getBoxNumber(index1,index2)
            if(this.turnNumber%2 !=0){
          // this.boxArray[index] = 'X';
          this.boxArray[index1][index2] = 'X'
        
            }
            else{
              this.boxArray[index1][index2] = 'O';
             
            }
        
            
        let a = (2 * this.arraySize) -1;
            if(this.turnNumber >= a){
              this.checkIfWon()
            }
            
            this.turnNumber++;
          
          }
        


          getBoxNumber(index1 , index2 ){
  
            if(index1 == 0){
              index2 = index2+1
            }
            else if(index1 == 1){
              console.log(index2);
              index2 = index2+4;
            }
            else{
              index2 = index2 + 7;
            }
        
        return index2; 
          }
        

render(){
    return(
      <div>
      <h1> TIC TAC TOE</h1>
      <div className="type">
          <button className="btn btn-primary" onClick={()=> this.setboxArray(3)}>3 x 3</button>
          <button className="btn btn-primary" onClick={()=> this.setboxArray(5)}>5 x 5</button>
          <button className="btn btn-primary" onClick={()=> this.setboxArray(7)}>7 x 7</button>
      </div>
      <h3 >{this.state.wontext != null ? this.state.wontext : null}</h3>
      <div className="content">
      
          <div>
            { this.state.boxArray.forEach((item,index1)=>{
          <div className='box'>
            {item.forEach((box,index2)=>{
              <input className="field" disabled={this.state.wontext != 'null'}  onClick={($event) =>this.turn(index1,index2,$event)} value={this.state.boxArray[index1][index2]}/>
            })}
      
      </div>
            })
          }
            
      </div>
      </div>
      </div>
      
    );
    
}

}

export default Landing;

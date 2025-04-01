#include<iostream>
using namespace std;
int main(){
    char ch='8';
    if(ch>=48 && ch<=57){
        cout<<"it is numeric";
    } else if(ch>=65 && ch<=90){
        cout<<"it is upper case word";
    }else if(ch>=97&& ch<=122){
        cout<<"it is lower case abcd";
    }else{
        cout<<"wrong caharacter";
    
    }
    return 0;

}
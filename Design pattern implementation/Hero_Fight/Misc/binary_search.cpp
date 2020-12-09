#include <iostream>
#include <vector>

using namespace std;
int binary_search(vector<int> vec, int startInd, int endInd, int key);
int main(){
vector<int> vec={-1,0,1,3,5,7};

cout<<binary_search(vec,0,vec.size()-1,3)<<endl;

}

int binary_search(vector<int> vec, int startInd, int endInd, int key){
    int index=-1;
    int mid;
    while(startInd<=endInd){
        mid=startInd+(endInd-startInd)/2;
        
        if(vec[mid]<key){
            startInd=mid+1;
        }
        else if(vec[mid]>key){
            endInd=mid-1;cout<<">"<<endl;
        }
        else{
            index=mid;
            break;
        }
    }
    return index;
}
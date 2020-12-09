#include<iostream>
#include<vector>
using namespace std;


vector<int> quickSort(vector<int> a);
vector<int> concatenate(vector<int> a, int b, vector<int> c);

int main(){
    vector<int> list={0,1,-1,5,6,7,9,4,3};
    list=quickSort(list);

    for(int n:list){
        cout<<n;
    }
    cout<<"\n";
}

vector<int> quickSort(vector<int> a){
    vector<int> less, piviotList, greater;
    int piviot;
    if(a.size()<=1){
        return a;
    }
    else{
        piviot= a[a.size()-1];
        for(int i=0;i<a.size()-1;i++){
            if(a[i]>piviot){
                greater.push_back(a[i]);
            }
            else{
                less.push_back(a[i]);
            }
            piviotList.push_back(piviot);
        }
        return concatenate(quickSort(less),piviot,quickSort(greater));
    }
}

vector<int> concatenate(vector<int> a, int b, vector<int> c){
    a.push_back(b);
    a.insert(a.end(),c.begin(),c.end());
    return a;
}
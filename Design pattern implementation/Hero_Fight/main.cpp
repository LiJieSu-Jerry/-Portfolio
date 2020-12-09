#include "hero.h"
#include "skill.h"
#include <iostream>
#include <fstream>
#include <string>

void menu();
void battleStart(Hero &myHero,Hero &enemy);
void learnSkill(Hero &myHero,Hero &enemy);
void action(Hero &myHero, Hero &enemy);
Hero createMyHero(std::string userInput);


int main(){
    menu();
    std::cout<<"OK"<<std::endl;
    return 0;
}

void battleStart(Hero &myHero,Hero &enemy){
    int select;
    bool myTurn=true;
    learnSkill(myHero,enemy);
    myHero.print_skillList();
    while(myHero.isHpZero()==false&&enemy.isHpZero()==false){
        if (myTurn==true){
            std::cout<<"Your hero still has "<<myHero.get_hp()<<" HP"<<std::endl;
            action(myHero,enemy);
            myTurn=false;
        }
        else{
            std::cout<<"Enemy still has "<<enemy.get_hp()<<" HP"<<std::endl;
            Skill s=enemy.get_skillvector()[0];
            std::cout<<"Enemy use "<<s.get_skillName()<<std::endl;
            enemy.use_skill(s);
            int damage=s.damageCal(enemy);
            myHero.injured(damage);
            myTurn=true;
        }
    }
    if(myHero.isHpZero()==true){
        std::cout<<"You lose!"<<std::endl;
        std::cout<<"Thank you for playing! Press any key to exit"<<std::endl;
        system("pause");
    }
    else{
        std::cout<<"You win!"<<std::endl;
        std::cout<<"Thank you for playing! Press any key to exit"<<std::endl;
        system("pause");
    }
}

void menu(){
    int select;
    std::string name;
    Hero Enemy1("Mob_A",50,10);
    Hero Enemy2("Mob_A",50,10);
    Skill eSkill("Fireball","Magic");
    Enemy1.learn_skill(eSkill);
    std::cout<<"Hello there! Would you like to adventure in this world?"<<std::endl;
    std::cout<<"1. YES\n2. NO\n";
    std::cin>>select;
    if(select==1){
        system("cls");
        std::cout<<"Type your name: ";
        std::cin>>name;
        Hero myHero=createMyHero(name);
        battleStart(myHero,Enemy1);
    }
    else{
        std::cout<<"Good bye"<<std::endl;
        exit(0);
    }

}



Hero createMyHero(std::string userInput){
    Hero myHero(userInput);
    return myHero;  
}

void learnSkill(Hero &myHero, Hero &enemy){
        int select;
        std::string skillType;
        std::string skillName;
        std::cout<<"Hi! "<<myHero.get_heroName()<<std::endl;
        std::cout<<"You have to fight with "<<enemy.get_heroName()<<std::endl;
        std::cout<<"But first, you have to learn new skill"<<std::endl;
        std::cout<<"Select one skill you want to learn:"<<std::endl;
        std::cout<<"1. Power punch"<<std::endl;
        std::cout<<"2. Magic beam"<<std::endl;
        std::cin>>select;
        skillName=(select==1)?"Power punch":"Magic beam";
        skillType=(select==1)?"Physical":"Magic";
        Skill selectedSkill(skillName,skillType);
        myHero.learn_skill(selectedSkill);
}

void action(Hero &myHero, Hero &enemy){
    int select;
    std::cout<<"What do you want to do!"<<std::endl;
    while(select!=1){
    std::cout<<"1. Fight"<<std::endl;
    std::cout<<"2. Escape"<<std::endl;
    std::cin>>select;
    if(select!=1){
        std::cout<<"You cannot do anything but Fight for now"<<std::endl;
        }
    }
    std::cout<<"Select the skill you want to use:\n";
    myHero.print_skillList();
    std::cin>>select;
    int damageDeal=myHero.use_skill(myHero.get_skillvector()[select-1]);
    std::cout<<"You cause "<<damageDeal<<std::endl;
    enemy.injured(damageDeal);
}


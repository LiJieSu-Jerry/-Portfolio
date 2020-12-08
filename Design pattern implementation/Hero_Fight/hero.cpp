#include "skill.h"
#include "hero.h"
#include<iostream>
#include<string>
#include <vector>



        void Hero::hp_decrease(int realDamage){
            hp-=realDamage;
        }
        void Hero::mp_decrease(int consumption){
            mp-=consumption;
        }
        Hero::Hero(std::string name){
            this->name=name;
        }
        Hero::Hero(std::string name,int hp,int mp , int level){
            this->name=name;
            this->level=level;
            this->hp=hp;
            this->mp=mp;
        }
        std::string Hero::get_heroName(){
            return name;
        }
        bool Hero::isHpZero(){
            return hp==0;
        }
        bool Hero::isMpZero(){
            return mp==0;
        }
        int Hero::get_hp(){
            return hp;
        }
        int Hero::get_mp(){
            return mp;
        }
        int Hero::get_str(){
            return str;
        }
        int Hero::get_wis(){
            return wis;
        }
        int Hero::get_def(){
            return def;
        }
        int Hero::get_level(){
            return level;
        }
        std::vector<Skill> Hero::get_skillvector(){
            return skillList;
        }
        void Hero::print_skillList(){
            int i=1;
            for(Skill s: skillList){
                std::cout<<i<<". "<<s.get_skillName()<<std::endl;
            }
        }
        int Hero::use_skill(Skill s){
            if (s.get_consumption()<mp){
                mp_decrease(s.get_consumption());
                return s.damageCal(*this);
            }
            else{
                std::cout<<"No enough Mana to use."<<std::endl;
                return 0;
            }
        }
        void Hero::injured(int damage){
            int realDamage;
            realDamage= damage-def;
            realDamage=(realDamage>0)?realDamage:1;
            hp_decrease(realDamage);
        }
        void Hero::gain_exp(int exp){
            this->exp+=exp;
        }
        void Hero::learn_skill(Skill s){
            skillList.push_back(s);
        }

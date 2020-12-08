#ifndef HERO_H
#define HERO_H
#include "skill.h"
#include <vector>
#include <string>

class Skill;

class Hero{
    private:
        std::string name;
        int level=1;
        int exp=0;
        int hp=100;
        int mp=10;
        int str=10;
        int wis=10;
        int def=0;
        std::vector<Skill> skillList;
        void hp_decrease(int realDamage);
        void mp_decrease(int consumption);
    public:
        Hero();
        Hero(std::string name);
        Hero(std::string name,int hp,int mp , int level=1);
        std::string get_heroName();
        bool isHpZero();
        bool isMpZero();
        int get_hp();
        int get_mp();
        int get_str();
        int get_wis();
        int get_def();
        int get_level();
        std::vector<Skill> get_skillvector();
        void print_skillList();
        int use_skill(Skill s);
        void injured(int damage);
        void gain_exp(int exp);
        void learn_skill(Skill s);
};
#endif
#ifndef SKILL_H
#define SKILL_H
#include "hero.h"
#include<string>

class Hero;

class Skill{
    private:
        std::string skillName;
        std::string skillType;
        int damage=1;
        int consumption=1;
    public:
        Skill();
        Skill(std::string skillName,std::string skillType);
        std::string get_skillName();
        int damageCal(Hero hero);
        int get_consumption();
};

#endif
#include "hero.h"
#include "skill.h"
#include <string>



        
        Skill::Skill(std::string skillName,std::string skillType){
            this->skillName=skillName;
            this->skillType=skillType;
        }
        std::string Skill::get_skillName(){
            return skillName;
        }
        int Skill::damageCal(Hero hero){
            if (skillType=="Physical"){
                return hero.get_str()*hero.get_level();
            }
            else if (skillType=="Magic"){
                return hero.get_wis()*hero.get_level();
            }
            else{
                return 1;
            }
        }
        int Skill::get_consumption(){
            return consumption;
        }

CREATE MIGRATION m1a5trvcn6t475h7i7f2arevaqzuxifx6cjh2d5wwwsaxtqdpg5zea
    ONTO m1tmicgq4jkeivsz3ofhzap5w7h22k6xjhauhrnp2ukcqbjuayky7q
{
  ALTER TYPE app_cm::CmClientServiceFlow EXTENDING sys_core::ObjRoot BEFORE sys_user::Mgmt;
};

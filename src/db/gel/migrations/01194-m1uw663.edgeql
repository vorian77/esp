CREATE MIGRATION m1uw663gf46ocokrc5t7hdw7p5zmgi6mql7mwosfj5nil6us36khjq
    ONTO m1o3q52ibxesrmv5d2hrlo3mvwvqrzt4kajvtk4tvdzxh3wiwx4swa
{
  ALTER TYPE sys_user::SysUserAction {
      CREATE PROPERTY expr: std::str;
  };
};

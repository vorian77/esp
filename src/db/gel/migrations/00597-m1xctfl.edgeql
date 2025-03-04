CREATE MIGRATION m1xctfl4lroolra4druyqsut727sojbxsspatmfxf662kwmdc5f2xa
    ONTO m1us74jhdncw5tpld76kw4chc5km7jifhlgo2zrvzpukdmpoy25ciq
{
              ALTER TYPE sys_user::SysUser {
      DROP EXTENDING sys_user::UserRoot;
      CREATE CONSTRAINT std::exclusive ON (.userName);
  };
};

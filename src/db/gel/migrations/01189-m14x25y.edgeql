CREATE MIGRATION m14x25yk4wpi5c6thw77ebf5spw6r3vgzg7kmy4lcvb7oboqrs4baq
    ONTO m14o5nguz3rb4caogo7syzlyjj3yha4rddma5iijauks2x2ydnug3q
{
  DROP FUNCTION sys_rep::getReport(name: std::str);
  DROP FUNCTION sys_user::getUserAction(name: std::str);
  ALTER TYPE sys_core::SysObjAttr {
      DROP CONSTRAINT std::exclusive ON (.name);
  };
};

CREATE MIGRATION m1gdebwb666egvejds6kncq7mcrzmove2shrwyy6j7m3fx4djwz7xq
    ONTO m1t5v3dzpfnht3c7sqriwd3c4uivd4iltmjhwb6bxx7agr27okjyma
{
                  CREATE TYPE default::Person {
      CREATE REQUIRED PROPERTY name: std::str {
          CREATE CONSTRAINT std::exclusive;
      };
  };
  CREATE TYPE default::Movie {
      CREATE LINK character: default::Person;
      CREATE REQUIRED PROPERTY title: std::str {
          CREATE CONSTRAINT std::exclusive;
      };
  };
};

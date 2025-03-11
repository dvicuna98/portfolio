export interface PortfolioData {
  about: {
    [key: string]: {
      title: string;
      description: string;
      cvUrl: string;
    };
  };
  education: {
    [key: string]: Array<{
      degree: string;
      institution: string;
      period: string;
      descriptions: string[];
      skills: string[];
    }>;
  };
  experience: {
    [key: string]: Array<{
      position: string;
      company: string;
      period: string;
      descriptions: string[];
      skills: string[];
    }>;
  };
  projects: {
    [key: string]: Array<{
      title: string;
      description: string;
      technologies: string[];
      link: string;
    }>;
  };
  contact: {
    [key: string]: {
      email: string;
      linkedin: string;
      github: string;
    };
  };
}

export type Theme = 'dark1' | 'dark2' | 'light1' | 'light2';
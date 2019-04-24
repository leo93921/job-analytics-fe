import { Company } from './company';

export class Job {
  id: string;
  name: string;
  firstVisit: Date;
  lastVisit: Date;
  link: string;
  requirements: string[];
  responsibilities: string[];
  platform: string;
  company: Company;
}

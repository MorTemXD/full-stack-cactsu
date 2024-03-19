import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Contact {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => User, (user) => user.receivedContactRequests)
    user: User; 
  
    @ManyToOne(() => User, (user) => user.sentContactRequests)
    contact: User;
}

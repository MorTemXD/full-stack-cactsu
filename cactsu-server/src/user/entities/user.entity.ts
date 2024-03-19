import { Contact } from "src/contact/entities/contact.entity";
import { Message } from "src/messages/entities/message.entity";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'bytea', nullable: false, default: Buffer.from([]) })
    avatar: Buffer;

    @Column()
    phoneNumber: string;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    name: string;

    @Column()
    surname: string;

    @OneToMany(() => Contact, (contact) => contact.user)
    sentContactRequests: Contact[];

    @OneToMany(() => Contact, (contact) => contact.contact)
    receivedContactRequests: Contact[];

    @ManyToMany(() => Message, (message) => message.sender)
    sentMessages: Message[];

    @ManyToMany(() => Message, (message) => message.recipient)
    receivedMessages: Message[];
}
import { Command } from "commander";

const args = new Command();

args.option("-p <port>", "port");
args.option("--env <env>", "enviroment", "dev");

args.parse();
export default args.opts();

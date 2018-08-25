'''
from watchdog.observers import Observer
from watchdog.events import LoggingEventHandler
from watchdog.events import FileSystemEventHandler
class pinger(FileSystemEventHandler):
    def __init__(self,socketio):
        self.socketio = socketio
        super().__init__()

    def on_any_event(self, event):
        self.socketio.send("file updated")

path = "src"
observer = Observer()
observer.schedule(pinger(socketio), path, recursive=True)
observer.start()
'''

# Scheduler for Kalimtak Continuous Learning Tasks
import time
import threading
from datetime import datetime, timedelta
from typing import Optional
from model_training import ModelTrainingOrchestrator
from database import SupabaseService

class TaskScheduler:
    """Schedule and run continuous learning tasks"""
    
    def __init__(self, db_service: SupabaseService):
        self.db_service = db_service
        self.training_orchestrator = ModelTrainingOrchestrator(db_service)
        self.running = False
        self.thread: Optional[threading.Thread] = None
    
    def start(self) -> None:
        """Start the scheduler"""
        if not self.running:
            self.running = True
            self.thread = threading.Thread(target=self._run_scheduler, daemon=True)
            self.thread.start()
            print("Task scheduler started")
    
    def stop(self) -> None:
        """Stop the scheduler"""
        self.running = False
        if self.thread and self.thread.is_alive():
            self.thread.join(timeout=5)  # Wait up to 5 seconds for thread to finish
        print("Task scheduler stopped")
    
    def _run_scheduler(self) -> None:
        """Main scheduler loop"""
        # Track last run times for each task
        last_daily = datetime.now() - timedelta(days=1)
        last_weekly = datetime.now() - timedelta(weeks=1)
        last_monthly = datetime.now() - timedelta(weeks=4)
        
        while self.running:
            now = datetime.now()
            
            # Daily tasks (data curation)
            if now - last_daily >= timedelta(days=1):
                print(f"[{now}] Running daily data curation task...")
                self._run_daily_task()
                last_daily = now
            
            # Weekly tasks (model fine-tuning)
            if now - last_weekly >= timedelta(weeks=1):
                print(f"[{now}] Running weekly model fine-tuning task...")
                self._run_weekly_task()
                last_weekly = now
            
            # Monthly tasks (comprehensive evaluation)
            if now - last_monthly >= timedelta(weeks=4):
                print(f"[{now}] Running monthly evaluation task...")
                self._run_monthly_task()
                last_monthly = now
            
            # Sleep for an hour before checking again
            time.sleep(3600)  # 1 hour
    
    def _run_daily_task(self) -> None:
        """Run daily data curation task"""
        try:
            # This would trigger the admin endpoint to curate training data
            # For now, we'll simulate the process
            print("Curating high-quality interactions for training...")
            # In a real implementation, this would call the API endpoint
            # or directly use the database service
        except Exception as e:
            print(f"Error in daily task: {e}")
    
    def _run_weekly_task(self) -> None:
        """Run weekly model fine-tuning task"""
        try:
            print("Starting weekly model fine-tuning...")
            self.training_orchestrator.run_full_training_cycle()
        except Exception as e:
            print(f"Error in weekly task: {e}")
    
    def _run_monthly_task(self) -> None:
        """Run monthly comprehensive evaluation task"""
        try:
            print("Running monthly comprehensive evaluation...")
            # This would run a full evaluation suite on the current model
            # and compare it with previous versions
        except Exception as e:
            print(f"Error in monthly task: {e}")

# Singleton instance
_scheduler: Optional[TaskScheduler] = None

def get_scheduler(db_service: SupabaseService) -> TaskScheduler:
    """Get the singleton scheduler instance"""
    global _scheduler
    if _scheduler is None:
        _scheduler = TaskScheduler(db_service)
    return _scheduler

def start_scheduler(db_service: SupabaseService) -> None:
    """Start the scheduler"""
    scheduler = get_scheduler(db_service)
    scheduler.start()

def stop_scheduler() -> None:
    """Stop the scheduler"""
    global _scheduler
    if _scheduler:
        _scheduler.stop()